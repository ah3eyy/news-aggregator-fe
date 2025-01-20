interface IProps {
    message: string,
    type: 'success' | 'error'
}

export const AlertNotification = ({message, type}: IProps) => {

    return (
        <>
        <div className={`
          w-full p-[12px] rounded-[16px] mt-[10px]
          ${type === 'success' && 'bg-primary '}
          ${type === 'error' && 'bg-[red] bg-opacity-[0.9]'}
        `}>
            <h4 className={"font-bold text-white text-[16px]"}>Notification</h4>
           <p className={"font-normal text-white text-[14px]"}>
               {message}
           </p>
        </div>
        </>
    )
}
