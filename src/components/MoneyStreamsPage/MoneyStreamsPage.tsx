
import { MoneyStreamsDataTable, MoneyStreamsDataTableProps } from "../MoneyStreamsDataTable/MoneyStreamsDataTable";
import { MoneyStreamsAccountsTable, MoneyStreamsAccountsTableProps } from "../MoneyStreamsAccountsTable/MoneyStreamsAccountsTable";
import { useState } from "react";
import "./MoneyStreamsPage.scss";




function MoneyStreamsPage(){
    // Import all of the data for meanfi here

    // Pass to my child components from here


    
    


    

    const fakeDataObject: MoneyStreamsDataTableProps  = {
        recievingFrom: "TKvGNWq33gFn9HVNaWRMDmjsqHmjzZAnreKS2xurVYy",
        sendingToo: null,
        started: "Fri Feb 25 2022",
        fundsLeftInAccount: 0.009887,
        paymentRate: 0.001000,
        fundsAvailableToWithdrawNow: 0.000113,
        reservedAllocation: 0.0100000,
        streamID: "TKvGNWq33gFn9HVNaWRMDmjfLHmjzZAnreKS2xurVYy",
    };

    const fakeAccountObject: MoneyStreamsAccountsTableProps = {
        sendOrRecieve: "recieve",
        recievingMoneySinceDate: "",
        USDCPerDay: 15,
        name: "",
        dataObject: fakeDataObject,
    };



    const fakeDataObject2: MoneyStreamsDataTableProps  = {
        recievingFrom: "TKvGNWq33gFn9HVNaWRMDmjsqHmjzZAnreKS2xurVYy",
        sendingToo: null,
        started: "Fri Feb 25 2022",
        fundsLeftInAccount: 0.009887,
        paymentRate: 0.001000,
        fundsAvailableToWithdrawNow: 0.000113,
        reservedAllocation: 0.0100000,
        streamID: "TKvGNWq33gFn9HVNaWRMDmjfLHmjzZAnreKS2xurVYy",
    };

    const fakeAccountObject2: MoneyStreamsAccountsTableProps = {
        sendOrRecieve: "recieve",
        recievingMoneySinceDate: "",
        USDCPerDay: 15,
        name: "",
        dataObject: fakeDataObject2,
    };


    const inputObjectList: MoneyStreamsAccountsTableProps[] = [
        fakeAccountObject,
        fakeAccountObject2,
    ];


    
    const [selectedMoneyStream, setSelectedMoneyStream] = useState(inputObjectList[0]);

    return(
        <div className="page-container">
            <MoneyStreamsAccountsTable {...selectedMoneyStream} setSelectedMoneyStream={(data: MoneyStreamsDataTableProps) => setSelectedMoneyStream}/>
            <MoneyStreamsDataTable {...(selectedMoneyStream.dataObject)}/>
        </div>
    );
}


export {MoneyStreamsPage}