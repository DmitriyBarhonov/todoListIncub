

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized : false
}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }

        case 'APP/SET-ERROR':

            return { ...state, error: action.error }
        case 'APP/SET-INITIALIZEED':
            return { ...state, isInitialized: action.isInitialized }
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setInitializedAC = (isInitialized: boolean) => ({ type: 'APP/SET-INITIALIZEED', isInitialized } as const)
export type SetStatusType = ReturnType<typeof setStatusAC> 
export type SetErrorType =  ReturnType<typeof setErrorAC>
export type SetInitializedType =   ReturnType<typeof setInitializedAC>
 

type ActionsType = SetStatusType | ReturnType<typeof setErrorAC> | SetInitializedType