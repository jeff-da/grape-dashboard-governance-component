
import "./MoneyStreamsDataTable.scss"

export interface MoneyStreamsDataTableProps {
    recievingFrom: string;
    sendingToo: string;
    started: string;
    fundsLeftInAccount: number;
    paymentRate: number;
    reservedAllocation: number;
    fundsAvailableToWithdrawNow: number;
    streamID: string;
}

// TKvGNWq33gFn9sVNaWRMDmjfLHmjzZAnreKS2xurVYy -> TKvG...rVYy
function abbreviateAddress(address :string): string{
    if(address.length > 8){
        let shortAddress = "";
        for (let i = 0; i < 4; i++) {
            shortAddress += address[i];
        }   
        shortAddress += "...";
        for (let i = address.length - 4; i < address.length; i++) {
            shortAddress += address[i];
        }
        return shortAddress
    }
    return address;
}

function preciseNumbers(x: number){
    return x.toPrecision(4);
}


function MoneyStreamsDataTable(props: MoneyStreamsDataTableProps){
    const {
        recievingFrom,
        sendingToo,
        started,
        fundsLeftInAccount,
        paymentRate,
        fundsAvailableToWithdrawNow,
        reservedAllocation,
        streamID,
    } = props;

    return (
        <div className="data-table-container">
            <div className="recieving-from-text">Recieving from</div>
            <div className="recieving-from-value">{abbreviateAddress(recievingFrom)}</div>
            <div className="payment-rate-text">Payment Rate</div>
            <div className="payment-rate-value">{preciseNumbers(paymentRate)} / hour</div>
            <div className="started-text">Started</div>
            <div className="started-value">{started}</div>
            <div className="funds-left-text">Funds left in account</div>
            <div className="funds-left-value">{preciseNumbers(fundsLeftInAccount)} USDC</div>
            <div className="reserved-allocation-text">Reserved Allocation</div>
            <div className="reserved-allocation-value">{preciseNumbers(reservedAllocation)} USDC</div>
            <div className="funds-available-to-withdraw-text">Funds available to widthdraw now</div>
            <div className="funds-available-to-withdraw-value">{preciseNumbers(fundsAvailableToWithdrawNow)} USDC</div>
            <div className="withdraw-funds"></div>
            <div className="stream-id">STREAM ID: {streamID}</div>
        </div>
    );
}


export { MoneyStreamsDataTable }