const GAPI = window.gapi
const CLIENT_ID = '508199377210-gbh8a1rbr52kqtgrildqheb1blf88fve.apps.googleusercontent.com'

let onAuthInit = null
let GoogleAuth = null

const authListeners = []

const AuthPromise = new Promise((resolve) => {
	GAPI.load('auth2', () => {
		let init = true

		GAPI.auth2.init({
			client_id: CLIENT_ID,
		})

		GoogleAuth = GAPI.auth2.getAuthInstance()

		GoogleAuth.currentUser.listen(() => {
			updateListeners()
			if (init) {
				resolve()
				init = false
			}
		})
	})
})

export function signedIn() {
	return new Promise((resolve, reject) => {
		AuthPromise.then(() => {
			if (GoogleAuth.isSignedIn.get()) {
				resolve()
			} else {
				reject()
			}
		})
	})
}

export function onAuthUpdate(cb) {
	authListeners.push(cb)
}

export function signIn() {
	return GoogleAuth.signIn().then(() => {
		updateListeners()
	})
}

export function currentUser() {
	return new Promise((resolve) => {
		AuthPromise.then(() => {
			resolve(GoogleAuth.currentUser.get())
		})
	})
}

export function currentUserProfile() {
	return currentUser().then((user) => user.getBasicProfile())
}

export function getIdToken() {
	return currentUser().then((user) => user.getAuthResponse().id_token)
}

function updateListeners() {
	authListeners.forEach((cb) => cb())
}