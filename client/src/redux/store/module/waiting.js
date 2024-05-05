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
const DELETE = "waiting/DELETE";
const UPDATE = "waiting/UPDATE";
const JOIN = "waiting/JOIN";

export const init = (rooms) => ({
    type: INIT,
    data: rooms,
});

export const create = (payload) => ({
    type: CREATE,
    payload, // {room_id, r_name, r_password, user_id}
});

export const del = (id) => ({
    type: DELETE,
    id, // {user_id}
});

export const join = (payload) => ({
    type: JOIN,
    payload, // {room_id, r_password, user_id, guest_id, r_state}
});

// 수정
// 방장이 아닌 다른 유저가 퇴장했을 때
export const update = (payload) => ({
    type: UPDATE,
    payload, // {r_state, guest_id}
});

export function waiting(state = initialState, action) {
    switch (action.type) {
        case INIT:
            return {
                ...state,
                rooms: action.data,
                // nextID:
                //     action.data.length > 0
                //         ? action.data[action.data.length - 1].room_id + 1
                //         : 1,
            };
        case CREATE:
            return {
                ...state,
                rooms: [
                    ...state.rooms,
                    {
                        room_id: action.payload.room_id,
                        // room_id: state.nextID,
                        r_name: action.payload.r_name,
                        // guest_id: action.payload.guest_id,
                        r_password: action.payload.r_password, // 수정
                        user_id: action.payload.user_id,
                    },
                ],
                // nextID: state.nextID + 1,
            };
        case DELETE:
            return {
                ...state,
                rooms: state.rooms.filter(
                    (rooms) => rooms.user_id !== rooms.action.payload.user_id
                ),
            };

        case UPDATE:
            return {
                ...state,
                rooms: state.rooms.map((li) =>
                    li.room_id === action.payload.room_id
                        ? {
                              ...li,
                              r_state: false,
                              guest_id: null,
                          }
                        : li
                ),
            };

        // payload에서 보내준 roomId와 r_password가 같으면, user_id와 guest_id 업데이트
        case JOIN:
            return {
                ...state,
                rooms: state.rooms.map((room) => {
                    if (
                        room.room_id === action.payload.room_id
                        // && room.r_password === action.payload.r_password
                    ) {
                        return {
                            ...room,
                            // user_id: action.payload.user_id,
                            guest_id: action.payload.guest_id,
                            r_state: true,
                        };
                    }
                    return room; // 일치하지 않는 방은 그대로 반환
                }),
            };

        default:
            return state;
    }
}
