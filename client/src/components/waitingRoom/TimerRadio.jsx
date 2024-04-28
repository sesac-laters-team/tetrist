export default function TimerRadio({children, value, name, defaultChecked}) {

    return (
        <label>
            <input 
                type="radio"
                value={value}
                name={name}
                defaultChecked={defaultChecked}
            />
            {children}
        </label>
    )
}