import { useMemo } from 'react'
import './index.css'

type IProps = {
    /** 显示/隐藏蒙层 */
    show: boolean
    /** 点击蒙层触发的回调 */
    onClick: () => void
}

export default ({ show, onClick }: IProps) => {
    const maskContainerExtraStyle = useMemo(() => ({ display: show ? 'block' : 'none' }), [show])

    return (
        <div className="mask-container" style={maskContainerExtraStyle} onClick={() => onClick && onClick()}></div>
    )
}