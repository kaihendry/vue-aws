const GAPI = window.gapi
const CLIENT_ID = '508199377210-gbh8a1rbr52kqtgrildqheb1blf88fve.apps.googleusercontent.com'

let GoogleAuth = null

let sessionListeners = []

export function onSessionChange (cb) {
  sessionListeners.push(cb)
}

function fireSessionChange (signedIn) {
  sessionListeners.forEach((cb) => cb(signedIn))
}

export function initAuth () {
  return new Promise((resolve) => {
    GAPI.load('auth2', () => {
      GAPI.auth2.init({
        client_id: CLIENT_ID
      })

      GoogleAuth = GAPI.auth2.getAuthInstance()

      GoogleAuth.then(() => {
        GoogleAuth.isSignedIn.listen((signedIn) => {
          fireSessionChange(signedIn)
        })
        fireSessionChange(signedIn())
        resolve()
      })
    })
  })
}

export const signedIn = () => GoogleAuth.isSignedIn.get()

export const signIn = (opts) => GoogleAuth.signIn(opts)

export const signOut = (opts) => GoogleAuth.signOut(opts)

export const currentUser = () => GoogleAuth.currentUser.get()

export const currentUserProfile = () => currentUser().getBasicProfile()

export const getIdToken = () => currentUser().getAuthResponse().id_token
