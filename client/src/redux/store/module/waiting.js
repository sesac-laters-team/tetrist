const initialState = {
    rooms: [],
};

let count = initialState.rooms.length;
initialState["nextID"] = count;

const INIT = "waiting/INIT";
const CREATE = "waiting/CREATE";

export const init = (rooms) => ({
    type: INIT,
    data: rooms,
});

export const create = (payload) => ({
    type: CREATE,
    payload, // {room_id, r_name, r_status, user_id}
});

export function waiting(state = initialState, action) {
    switch (action.type) {
        case INIT:
            return {
                ...state,
                rooms: action.data,
                nextID:
                    action.data.length > 0
                        ? action.data[action.data.length - 1].room_id + 1
                        : 1,
            };
        case CREATE:
            return {
                ...state,
                rooms: [
                    ...state.rooms,
                    {
                        room_id: state.nextID,
                        r_name: action.payload.r_name,
                        r_status: action.payload.r_status,
                        user_id: action.payload.user_id,
                    },
                ],
                nextID: state.nextID + 1,
            };
        default:
            return state;
    }
}
