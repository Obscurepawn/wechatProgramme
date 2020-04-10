// var myDate = new Date();
// month = myDate.getFullYear();
// function test(month){
//     return month+1;
// }
// console.log(month)
// console.log(typeof(month))
// console.log(test(month))

groups = [
    {
        date: "2020-4-8",
        detail: [{
            usefulness: "car",
            amount: -15,
            comments: "回学校",
            payer: "Jankos"
        },
        {
            usefulness: "food",
            amount: -7,
            comments: "吃早餐",
            payer: "Me"
        },
        {
            usefulness: "play",
            amount: -300,
            comments: "买最新款的游戏",
            payer: "Me",
        },
        ]
    },
    {
        date: "2020-4-7",
        detail: [
            {
                usefulness: "house",
                amount: -7000,
                comments: "付房租",
                payer: "Me",
            },
            {
                usefulness: "financial",
                amount: 13000,
                comments: "发工资",
                payer: "Boss",
            },
            {
                usefulness: "book",
                amount: -50,
                comments: "买《白夜行》",
                payer: "Me",
            },
        ]
    }
]

function getSum(val) {
    console.log(val)
    var Expenditrue = 0;
    var Income = 0;
    val.forEach(element => {
            element.detail.forEach(bill => {
                console.log(bill)
                if (bill.amount < 0) {
                    Expenditrue += bill.amount;
                } else if (bill.amount > 0) {
                    Income += bill.amount;
                }
            });
        }
    )
    console.log(Expenditrue,Income);
}

getSum(groups);


