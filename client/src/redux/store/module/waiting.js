const initialState = {
    rooms: [
        {
            room_id: 100,
            r_name: "아무나 들어오셈",
            guest_id: null,
            r_password: null,
            userId: "nickname3",
        },
        {
            room_id: 200,
            r_name: "고수만",
            guest_id: "guest",
            r_password: null,
            userId: "owner",
        },
        {
            room_id: 300,
            r_name: "담타",
            guest_id: null,
            r_password: null,
            userId: "nickname6",
        },
    ],
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
                        guest_id: action.payload.guest_id,
                        r_password: action.payload.r_password, // 수정
                        userId: action.payload.user_id,
                    },
                ],
                nextID: state.nextID + 1,
            };
        default:
            return state;
    }
}
