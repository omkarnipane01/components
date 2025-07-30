// 1. shows the item code when items is selected and changed accordingly.

ZDK.Page.getSubform("BOM_For_Product").getField("Item_Code").setReadOnly(true);
ZDK.Page.getSubform("BOM_For_Product").getField("UOM").setReadOnly(true);
let BOM_For_Product = ZDK.Page.getSubform("BOM_For_Product").getValues();
let subform_array = [];
if (BOM_For_Product.length > 0) {
    for (let i = 0; i < BOM_For_Product.length; i++) {
        let new_map = {};
        // console.log(JSON.stringify(BOM_For_Product[i]));
        let raw_prodct_id = BOM_For_Product[i].Raw_Product.id;
        //call api to get the product code
        var product = ZDK.Apps.CRM.Raw_Material.fetchById(raw_prodct_id);
        // set this value to filed item code Item_Code
        new_map.Item_Code = product._Item_Code;

       

        subform_array.push(new_map);
    }

}
ZDK.Page.getSubform("BOM_For_Product").setValues(subform_array);


// 2. Allow user to add quantity according to stock availability

let BOM_For_Product = ZDK.Page.getSubform("BOM_For_Product").getValues();
// console.log("BOM_For_Product ", JSON.stringify(BOM_For_Product));
let subform_array = [];
if (BOM_For_Product.length > 0) {
    for (let i = 0; i < BOM_For_Product.length; i++) {
        console.log(BOM_For_Product[i]);

        let raw_prodct_id = BOM_For_Product[i].Raw_Product.id;
        var product = ZDK.Apps.CRM.Raw_Material.fetchById(raw_prodct_id);
        // console.log(product);// getting code successfully
        // _Unit_Price
        // _UOM_Quantity
        // _UOM

        if (BOM_For_Product[i].Qty) {
            if (parseInt(BOM_For_Product[i].Qty) > product._UOM_Quantity) {
            var cell_obj = ZDK.Page.getSubform('BOM_For_Product').getRow(index).getCell('Qty');
            cell_obj.showError('Quantity out of stock');
            cell_obj.setValue(null);
            
            }
        }
    }
}


// 3. Based on selected raw products calculate total price

let BOM_For_Product = ZDK.Page.getSubform("BOM_For_Product").getValues();
// console.log("BOM_For_Product ", JSON.stringify(BOM_For_Product));
let total = 0;
if (BOM_For_Product.length > 0) {
    for (let i = 0; i < BOM_For_Product.length; i++) {
    
        let Unit_Price = BOM_For_Product[i].Unit_Price;
        let Qty = BOM_For_Product[i].Qty;
        total = total + parseFloat(Unit_Price) * parseFloat(Qty);
    }

}
// ZDK.Page.getSubform("BOM_For_Product").setValues(subform_array);
// // Calculate the total amount based on selected raw products
// let Unit_Price = ZDK.Page.getSubform("BOM_For_Product").getField("Unit_Price");
// let Qty = ZDK.Page.getSubform("BOM_For_Product").getField("Qty");
ZDK.Page.getField("Price").setValue(total);