import React, { useCallback, useMemo } from "react";
import Mask from "../Mask"
import "./index.css"

type IProps = {
    /** modal宽度（默认400） */
    width?: number | string;
    /** 右上角是否显示关闭按钮 */
    closable?: boolean;
    /** 关闭Modal时销毁内部组件实例 */
    destroyOnClose?: boolean;
    /** 显示/隐藏Modal */
    show?: boolean;
    /** 关闭的回调 */
    onCancel?: () => void;
    /** 点击蒙层是否允许关闭 */
    maskClosable?: boolean;
    /** Modal标题 */
    title?: string | React.ReactNode;
    /** Modal内容节点 */
    children?: React.ReactNode;
}

type HeaderProps = {
    /** Modal标题 */
    title?: string | React.ReactNode;
    /** 显示隐藏关闭按钮 */
    showCloseBtn?: boolean,
    /** 关闭的回调 */
    onCancel?: () => void;
}


const Header = ({
    title,
    showCloseBtn,
    onCancel
}: HeaderProps) => {

    const modalHeaderExtraStyle = useMemo(() => ({ justifyContent: showCloseBtn ? 'space-between' : 'left' }), [showCloseBtn])

    return (
        <div className="modal-header" style={modalHeaderExtraStyle}>
            <div className="modal-header-title">{title}</div>
            {
                showCloseBtn && <div className="modal-header-close-btn" onClick={() => onCancel && onCancel()}>x</div>
            }
        </div>
    )
}


export default React.memo<IProps>(({ width = 400, destroyOnClose = false, children, show = true, onCancel, maskClosable = false, title, closable = true }) => {
    /** 点击蒙层关闭的逻辑 */
    const handleMaskClick = useCallback(() => {
        if (!maskClosable) return
        if (onCancel) onCancel()
    }, [
        maskClosable, onCancel
    ])

    const modalContainerExtraStyle = useMemo(() => ({ height: show ? '100vh' : 0 }), [show])

    const modalCardExtraStyle = useMemo(() => ({ width, display: show ? 'block' : 'none' }), [show, width])

    return (
        <div className="modal-container" style={modalContainerExtraStyle}>
            <Mask show={show} onClick={() => handleMaskClick()} />
            <div className="modal-card" style={modalCardExtraStyle} >
                <Header onCancel={() => onCancel && onCancel()} title={title} showCloseBtn={closable} />
                {destroyOnClose ? (
                    <>
                        {show ? children : <></>}
                    </>
                ) : children}
            </div>
        </div>
    )
})



