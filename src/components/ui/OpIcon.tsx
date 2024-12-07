import React from "react";
interface OpIconProps {
    firstname: string
    lastname: string
}
const OpIcon:React.FC<OpIconProps> = ({firstname,lastname}) =>{
    return (
        <div className='flex items-center justify-around'>
            <div
                className="relative rounded-[100px] bg-components-avatar-fill flex flex-col items-center justify-center text-center text-xl text-background-paper-elevation-0 font-avatar-initialslg">
                <div
                    className="w-10 absolute !m-[0] top-[calc(50%_-_10px)] left-[calc(50%_-_20px)] tracking-[0.14px] leading-[20px] flex items-center justify-center z-[0]">
                    {firstname.charAt(0).toUpperCase()+lastname.charAt(0).toUpperCase()}
                </div>
                <div className="w-10 relative h-10 [transform:_rotate(-90deg)] z-[1]"/>
            </div>
            <p>
                {firstname+' '+lastname}
            </p>
        </div>
    )
}
export default OpIcon;