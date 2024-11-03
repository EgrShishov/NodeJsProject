import {useEffect, useState} from "react";
import {getAllPayments} from "../services/paymentsService.js";
import PaymentCard from "../components/PaymentCard.jsx";

const PaymentsPage = () => {
    const [payments, setPayments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        const data = await getAllPayments();
        if (data) {
            setPayments(data);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (field) => {
        setSortField(field);
        const sortedPayments = [...payments].sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });
        setPayments(sortedPayments);
    };

    const filteredPayments = payments.filter(payment =>
        payment.PaymentDate.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="payments-search-bar">
                <input
                    type="text"
                    placeholder="Поиск по дате платежа"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <select onChange={(e) => handleSort(e.target.value)} value={sortField}>
                    <option value="">Сортировка</option>
                    <option value="cost">Сумма</option>
                    <option value="date">Дата платежа</option>
                </select>
            </div>

            <div className="payments-list">
                {filteredPayments ? (
                    filteredPayments.map((payment) => {
                        console.log(payments);
                        return (
                            <PaymentCard key={payment._id} payment={payment}/>
                        )
                    })
                ) : (
                    <div>Loading payments...</div>
                )}
            </div>
        </div>
    );
};

export default PaymentsPage;