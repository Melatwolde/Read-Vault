import Card_Data from "@/UI_presentations/Card_Data";
import Loan_Table from "@/UI_presentations/Loan_Table";
const Loans_Record = () => {
    return (
        <div className="flex flex-col gap-9">
            <h1 className='text-[30px] font-bold text-neutral-800'>Loans Record</h1>
            <div className='flex flex-col gap-4 -mt-5'>
                <Card_Data/>
                <Loan_Table/>
            </div>
            
        </div>
    );
};
export default Loans_Record;