const initialState = {
    gameInfo: [
        //{room_id, guest_id, user_id}
    ],
};

const CREATE_GAME = "gameRoom/CREATE_GAME";

export const createGame = (payload) => ({
    type: CREATE_GAME,
    payload, //{room_id, guest_id, user_id}
});

export function gameRoom(state = initialState, action) {
    switch (action.type) {
        case CREATE_GAME:
            return {
                ...state,
                gameInfo: [
                    ...state.gameInfo,
                    {
                        room_id: action.payload.room_id,
                        guest_id: action.payload.guest_id,
                        user_id: action.payload.user_id,
                        test: action.payload.test,
                    },
                ],
            };
        default:
            return state;
    }
}
