
import { MoneyStreamsDataTableProps }  from "../MoneyStreamsDataTable/MoneyStreamsDataTable"

export interface MoneyStreamsAccountsTableProps {
    sendOrRecieve: "send" | "recieve";
    recievingMoneySinceDate: string;
    USDCPerDay: number;
    name: string;
    dataObject: MoneyStreamsDataTableProps;
    setSelectedMoneyStream?: (data: MoneyStreamsDataTableProps) => void;
}


function MoneyStreamsAccountsTable(props: MoneyStreamsAccountsTableProps){
    const {
        sendOrRecieve,
        recievingMoneySinceDate,
        USDCPerDay,
        name,
        setSelectedMoneyStream,
    } = props;

    return (
        <div>  
            test from MoneyStreamsAccountsTable
        </div>
    );


}


export { MoneyStreamsAccountsTable }