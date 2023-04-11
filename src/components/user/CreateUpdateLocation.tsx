import { observer } from "mobx-react"
import { LocationType } from "models/location"
import { FC } from "react"

interface Props {
    defaultValues?: LocationType
}

const CreateUpdateLocationForm: FC<Props> = ({ defaultValues }) => {
    return(
        <div></div>
    )
}

export default observer(CreateUpdateLocationForm)
