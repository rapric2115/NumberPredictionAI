import ColumnModel from "../../models/ColumnModel.js";

const column1 = new ColumnModel({
    name: "column 1",
    index: 0,
    formulaCoefficient: 4.3473,
    history: [
        10,1,8,19,2,9,9,3,9,7
    ],
    constants: [
       { 
        constant: 0.005,
        times: 2
        },
        {
            constant: 0.004,
            times: 7
        },
        {
            constant: 0.003,
            times: 20
        }
    ],

})

const column2 = new ColumnModel({
    name: "Column2", 
    index:1,
    formulaCoefficient: 4.55,
    history: [ 
        20,3,9,20,7,10,20,10,25,15
    ],
    constants: [
        {
            constant: 0.006,
            times: 5
        }
    ]
})

export default [
    column1, column2
]