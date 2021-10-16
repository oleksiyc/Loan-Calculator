import moment from 'moment';

const helpers = {
    /*
        Build the data object used by the table
     */
    getMonthlyPaymentValues: function (props) {
        const monthly = this.getMonthlyInterestedPayments(props);
        const principalPayment = this.getPrincipleMonthlyPayment(props);

        const data = Array.from({
            length: props.months
        }, (data, index) => ({
            date: moment().add(index + 1, 'M').format('MMM Do YYYY'),
            principal: principalPayment,
            interest: monthly[index],
            total_repayment: principalPayment + monthly[index]
        }))

        if (this.passesMinMaxValidation(props)) {
            return data;
        } else {
            return []
        }
    },
    getPrincipleMonthlyPayment: function (props) {
        return Math.ceil(props.amount / (props.months));
    },
    getMonthlyInterestedPayments: function (props) {
        let totalAmountToPayLeft = props.amount;
        const principalPayment = this.getPrincipleMonthlyPayment(props);

        return [...new Array(props.months)].map((month, index) => {
            let interest = Math.ceil((props.interest / 100) * totalAmountToPayLeft);
            if (index === 0 && props.isBLLoan) interest += props.amount / 10;
            totalAmountToPayLeft -= principalPayment;
            return interest;
        });
    },
    passesMinMaxValidation: function (props) {
        if (!props.limits) {
            return true;
        }
        const amount = parseInt(props.amount);
        const months = parseInt(props.months);
        const loanType = props.isBLLoan ? 'business_loan' : 'revolving_credit_facility';

        return (
            props.limits[loanType].amount_max >= amount &&
            props.limits[loanType].amount_min <= amount &&
            props.limits[loanType].duration_max >= months &&
            props.limits[loanType].duration_min <= months
        )
    },
    intToCurrency: function (value, currency) {
        return currency + ' ' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
    reduceSum: function(list, key){
        return list.reduce(function (val, row) {
            return val + row[key];
        }, 0)
    }
}

export default helpers;