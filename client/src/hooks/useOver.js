import { useState } from "react";

export const useOver = () => {
    const [over, setOver] = useState(false);
    return [over, setOver];
};
