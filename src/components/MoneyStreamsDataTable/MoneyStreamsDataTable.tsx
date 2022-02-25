


export interface MoneyStreamsDataTableProps {
    recievingFrom: string;
    sendingToo: string;
    started: string;
    fundsLeftInAccount: number;
    paymentRate: number;
    fundsAvailableToWithdrawNow: number;
    streamID: string;
}


function MoneyStreamsDataTable(props: MoneyStreamsDataTableProps){
    const {
        recievingFrom,
        sendingToo,
        started,
        fundsLeftInAccount,
        paymentRate,
        fundsAvailableToWithdrawNow,
        streamID,
    } = props;

    return (
        <div>
            test from MoneyStreamsDataTable

        </div>
    );


}


export { MoneyStreamsDataTable }