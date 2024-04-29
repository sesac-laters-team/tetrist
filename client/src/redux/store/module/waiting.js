const initialState = {
    rooms: [
        {
            roomId: 1,
            timer: "sec30",
            title: "오목 한 판",
            roomPw: "",
            roomIndex: 0,
        },
        {
            roomId: 2,
            timer: "sec60",
            title: "오목 초보 들어오셈",
            roomPw: "1234",
            roomIndex: 1,
        },
    ],
};

let count = initialState.rooms.length;
initialState["nextID"] = count;

const CREATE = "waiting/CREATE";

export const create = (payload) => ({
    type: CREATE,
    payload, // object {roomId, timer, title, roomPw, roomIndex}
});

export function waiting(state = initialState, action) {
    switch (action.type) {
        case CREATE:
            // 타이틀 값이 입력되지 않으면 그냥 현 상태 유지..
            // if (action.payload.title.trim() === "") return state;
            return {
                ...state,
                rooms: state.rooms.concat({
                    roomId: action.payload.Id,
                    timer: action.payload.timer,
                    title: action.payload.title,
                    roomPw: action.payload.roomPw,
                    roomIndex: action.payload.roomIndex,
                }),
                nextID: action.payload.roomIndex + 1,
            };

        // 추가
        // console.log(action.payload.roomIndex)
        default:
            return state;
    }
}
