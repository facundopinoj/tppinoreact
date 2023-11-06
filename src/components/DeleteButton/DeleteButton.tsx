import { TrashFill } from "react-bootstrap-icons"

interface DeletButtonProps {
    onClick: () => void;
}

export const DeletButton = ({onClick}:DeletButtonProps) => {

    return(
        <TrashFill
            color= "#D32F2F"
            size={24}
            onClick={onClick}
            onMouseEnter={() => {document.body.style.cursor = 'pointer'}}
            onMouseLeave={() => {document.body.style.cursor = 'default'}}
        />
    )
}

export default DeletButton