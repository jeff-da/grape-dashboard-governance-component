
import { MoneyStreamsDataTableProps }  from "../MoneyStreamsDataTable/MoneyStreamsDataTable"
import "./MoneyStreamsAccountsTable.scss";


export interface MoneyStreamsAccountsTableProps {
    selectedMoneyStream?: MoneyStreamListItemProps;
    setSelectedMoneyStream?: (data: MoneyStreamListItemProps) => void;
    inputObjectList: MoneyStreamListItemProps[];
}


function MoneyStreamsAccountsTable(props: MoneyStreamsAccountsTableProps){
    const {
        setSelectedMoneyStream,
        selectedMoneyStream,
        inputObjectList,
    } = props;

    

    return (
        <div className="accounts-table-container">  
            <div>Title row</div>
            <div>
                {
                    inputObjectList.map((element) => {
                        return(
                            <MoneyStreamListItem onClick={() => setSelectedMoneyStream(element)} selectedMoneyStream={selectedMoneyStream} {...element}/>
                        );
                    })
                }
            </div>
        </div>
    );
}

export interface MoneyStreamListItemProps {
    sendOrRecieve: "send" | "recieve";
    recievingMoneySinceDate: string;
    USDCPerDay: number;
    name: string;
    dataObject: MoneyStreamsDataTableProps;
    selectedMoneyStream?: MoneyStreamListItemProps;
    onClick?: () => void;
};

function MoneyStreamListItem(props: MoneyStreamListItemProps){
    const {
        sendOrRecieve,
        recievingMoneySinceDate,
        USDCPerDay,
        selectedMoneyStream,
        name,
        onClick
    } = props;

    return (
        <div className={selectedMoneyStream.name === name ? "highlit-row" : ""} onClick={onClick}>
            {name}
        </div>
    );
}


export { MoneyStreamsAccountsTable }