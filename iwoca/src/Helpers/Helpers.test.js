import Helpers from './Helpers'

const mockLimits = {
    revolving_credit_facility: {
        amount_min: 1000,
        amount_max: 150000,
        duration_min: 1,
        duration_max: 12
    },
    business_loan: {
        amount_min: 10000,
        amount_max: 200000,
        duration_min: 1,
        duration_max: 60
    }
}

const mockData = {
    amount: 10000,
    months: 4,
    interest: 3,
    isBLLoan: false
}

describe('Helper functions to render data correctly work as intended', () => {
    it ('Principle value is calculated correctly', () => {
        expect(Helpers.getPrincipleMonthlyPayment(mockData)).toEqual(2500);
    });
    it ('Interest value is calculated correctly for RFC Loan', () => {
        expect(Helpers.getMonthlyInterestedPayments(mockData)).toEqual([300,225,150,75]);
    });
    it ('Interest value is calculated correctly for BL Loan', () => {
        const data = {...mockData, isBLLoan: true};
        expect(Helpers.getMonthlyInterestedPayments(data)).toEqual([1300,225,150,75]);
    });
    it ('Correct Total value is calculated correctly', () => {
        expect(Helpers.getMonthlyPaymentValues(mockData)).toEqual(          // 1
            expect.arrayContaining([
                expect.objectContaining({
                    total_repayment: 2800
                }),
                expect.objectContaining({
                    total_repayment: 2725
                }),
                expect.objectContaining({
                    total_repayment: 2650
                }),
                expect.objectContaining({
                    total_repayment: 2575
                })
            ])
        )
    });
    it ('A valid size table data object is created with mockData', () => {
        expect(Helpers.getMonthlyPaymentValues(mockData).length).toEqual(4);
    });
    it ('Limitations limits are passed given mockData', () => {
        const data = {...mockData, limits: mockLimits}
        expect(Helpers.passesMinMaxValidation(data)).toEqual(true);
    });
    it ('Limitations limits fails with invalid amount', () => {
        const data = {...mockData, limits: mockLimits, amount: 10}
        expect(Helpers.passesMinMaxValidation(data)).toEqual(false);
    });
    it ('reduceSum function works to be able to calculate total values', () => {
        expect(Helpers.reduceSum(Helpers.getMonthlyPaymentValues(mockData), 'principal')).toEqual(10000);
    });
});

describe('Helper functions to render display values work as intended', () => {
    it ('renders an int to have commas and a currency sign', () => {
        expect(Helpers.intToCurrency(2000, '£')).toEqual('£ 2,000.00');
    });
});