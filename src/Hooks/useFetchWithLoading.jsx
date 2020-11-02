import { useState, useEffect } from 'react'

const useFetchWithLoading = (fetchFn) => {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null
  })

  useEffect(() => {
    fetchFn()
      .then(data => {
        setState({
          loading: false,
          data,
          error: null
        })
      })
      .catch(error => {
        setState({
          loading: false,
          data: null,
          error
        })
      })
  }, [fetchFn])

  return {
    loading: state.loading,
    data: state.data,
    error: state.error
  }
}

export default useFetchWithLoading
