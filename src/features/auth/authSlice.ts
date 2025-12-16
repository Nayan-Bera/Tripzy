import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem("auth");
const isExist = storedAuth ? JSON.parse(storedAuth) : null;

export type TInitialState = {
	email_verified: boolean | null;
	phone_verified: boolean | null;
	name: string | null;
	role: string | null;
	access_token: string | null;
	refresh_token: string | null;
	avatar: string | null;
	onboarding: number;
};

const initialState: TInitialState = {
	email_verified: isExist?.email_verified ?? null,
	phone_verified: isExist?.phone_verified ?? null,
	role: isExist?.role ?? null,
	name: isExist?.name ?? null,
	access_token: isExist?.access_token ?? null,
	refresh_token: isExist?.refresh_token ?? null,
	avatar: isExist?.avatar ?? null,
	onboarding: isExist?.onboarding ?? 0,
};

const saveAuthToStorage = (state: TInitialState) => {
	localStorage.setItem("auth", JSON.stringify(state));
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Used on login & refresh
		setCredentials: (
			state,
			action: PayloadAction<Partial<TInitialState>>
		) => {
			Object.assign(state, action.payload);
			saveAuthToStorage(state);
		},

		// Used for profile updates
		updateCredentials: (
			state,
			action: PayloadAction<Partial<TInitialState>>
		) => {
			Object.assign(state, action.payload);
			saveAuthToStorage(state);
		},

		emailVerified: (state) => {
			state.email_verified = true;
			state.phone_verified = true;
			saveAuthToStorage(state);
		},

		updateOnboarding: (state) => {
			state.onboarding += 1;
			saveAuthToStorage(state);
		},

		logout: (state) => {
			Object.assign(state, {
				email_verified: null,
				phone_verified: null,
				role: null,
				access_token: null,
				refresh_token: null,
				avatar: null,
				onboarding: 0,
			});
			localStorage.removeItem("auth");
		},
	},
});

export const {
	setCredentials,
	updateCredentials,
	logout,
	emailVerified,
	updateOnboarding,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAuthData = (state: RootState) => state.auth;
