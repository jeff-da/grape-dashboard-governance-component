
import { MoneyStreamsDataTableProps }  from "../MoneyStreamsDataTable/MoneyStreamsDataTable"
import "./MoneyStreamsAccountsTable.scss"


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
        <div className="accounts-table-container">  
            <div>Title row</div>
            <div>
                main list
            </div>
        </div>
    );


}


export { MoneyStreamsAccountsTable }