import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../utils/api'

export default function ElectionControl() {
  const navigate = useNavigate()
  const [status, setStatus] = useState({ isActive: false, startedAt: null, stoppedAt: null })
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)

  useEffect(() => {
    const admin = localStorage.getItem('admin')
    if (!admin) {
      navigate('/admin-login')
      return
    }
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    try {
      const res = await API.get('/election/status')
      setStatus(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStart = async () => {
    if (!window.confirm('Start the election? Students will be able to vote.')) return
    setActionLoading('start')
    try {
      await API.post('/election/start')
      setStatus({ ...status, isActive: true, startedAt: new Date() })
    } catch (err) {
      alert('Failed to start election')
    } finally {
      setActionLoading(null)
    }
  }

  const handleStop = async () => {
    if (!window.confirm('Stop the election? Students will not be able to vote anymore.')) return
    setActionLoading('stop')
    try {
      await API.post('/election/stop')
      setStatus({ ...status, isActive: false, stoppedAt: new Date() })
    } catch (err) {
      alert('Failed to stop election')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReset = async () => {
    if (!window.confirm('⚠️ RESET ELECTION?\n\nThis will:\n- Delete all votes\n- Reset student voting status\n- Stop the election\n\nThis cannot be undone!')) return
    setActionLoading('reset')
    try {
      await API.post('/election/reset')
      setStatus({ isActive: false, startedAt: null, stoppedAt: null })
    } catch (err) {
      alert('Failed to reset election')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center">
          <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">Election Control</h1>

        <div className={`rounded-3xl p-8 mb-8 ${status.isActive ? 'bg-green-50 border border-green-200' : 'bg-slate-100 border border-slate-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-4 h-4 rounded-full ${status.isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
            <span className="text-lg font-semibold text-slate-900">
              Election is {status.isActive ? 'ACTIVE' : 'INACTIVE'}
            </span>
          </div>
          {status.startedAt && (
            <p className="text-sm text-slate-600">Started: {new Date(status.startedAt).toLocaleString()}</p>
          )}
          {status.stoppedAt && (
            <p className="text-sm text-slate-600">Stopped: {new Date(status.stoppedAt).toLocaleString()}</p>
          )}
        </div>

        <div className="space-y-4">
          {!status.isActive ? (
            <button
              onClick={handleStart}
              disabled={actionLoading === 'start'}
              className="w-full py-5 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-green-200 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {actionLoading === 'start' ? 'Starting...' : 'Start Election'}
            </button>
          ) : (
            <button
              onClick={handleStop}
              disabled={actionLoading === 'stop'}
              className="w-full py-5 px-6 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-amber-200 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
              {actionLoading === 'stop' ? 'Stopping...' : 'Stop Election'}
            </button>
          )}

          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={handleReset}
              disabled={actionLoading === 'reset'}
              className="w-full py-5 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-red-200 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {actionLoading === 'reset' ? 'Resetting...' : 'Reset Election'}
            </button>
          </div>
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="font-semibold text-amber-800 mb-2">⚠️ Warning</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Start: Enables voting for students</li>
            <li>• Stop: Disables voting, keeps results</li>
            <li>• Reset: Deletes all votes and resets everything</li>
          </ul>
        </div>
      </main>
    </div>
  )
}