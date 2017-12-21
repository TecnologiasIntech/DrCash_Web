import {Injectable} from '@angular/core';
import {Globals} from "../statics/globals";
import {ClosedTransaction} from "../interfaces/closed-transaction";
import {DateService} from "./date.service";
import {Transaction} from "../interfaces/transaction";

@Injectable()
export class PrintService {

    constructor() {
    }

    static printClosedTransaction(closedTransaction: ClosedTransaction) {
        let mywindow = window.open('', 'PRINT', 'height=800,width=300');

        mywindow.document.write('<html><head>');
        mywindow.document.write(` 
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
 <style>
 body {
    overflow:hidden;
    -webkit-print-color-adjust: exact;
}
@media print{
  .oculto-impresion, .oculto-impresion *{
    display: none !important;
  }
  .thead-dark th {
        color: #fff !important;
        background-color: #292b2c !important;
    }
}
</style>
 <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.8.0/JsBarcode.all.js"></script>
 
 </head><body >`);
        // language=HTML
        mywindow.document.write(`

            <!--Ticker Header-->
            <div class="row">
                <div class="col-4 mt-1">
                    <img src="https://image.ibb.co/jBf2eb/Clinica_La_Familia_Logo.png" alt="">
                </div>
                <div class="col-8">
                    Clinica La Familia
                    <br>
                    301 E Cottonwood Ln
                    <br>
                    Casa Grande AZ 85122
                    <br>
                    (602) 569-3999
                </div>
            </div>

            <!--Closing Statement-->
            <table class="table table-sm">
                <thead class="">
                <tr>
                    <th style="width: 55%;">Closing Statement</th>
                    <th></th>
                </tr>
                <tr>
                    <th class="text-right">Totals</th>
                </t class="text-right" r>
                </thead>
                <tbody>
                <tr>
                    <td style="width: 55%" class="text-right">Initial Cash</td>
                    <td class="text-right">$${closedTransaction.initial_cash}</td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">Amount Charged</td>
                    <td class="text-right">$${closedTransaction.total_charged}</td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">Cash</td>
                    <td class="text-right">$${closedTransaction.total_cash}</td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">Credit Card</td>
                    <td class="text-right">$${closedTransaction.total_credit}</td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">Check</td>
                    <td class="text-right">$${closedTransaction.total_check}</td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">Transactions</td>
                    <td class="text-right">${closedTransaction.transaction_count}</td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">Reports</td>
                    <td class="text-right"></td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">100's</td>
                    <td class="text-right">$${closedTransaction.bills_100 * 100}</td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">50's</td>
                    <td class="text-right">$${closedTransaction.bills_50 * 50}</td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">20's</td>
                    <td class="text-right">$${closedTransaction.bills_20 * 20}</td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">10's</td>
                    <td class="text-right">$${closedTransaction.bills_10 * 10}</td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">5's</td>
                    <td class="text-right">$${closedTransaction.bills_5 * 5}</td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">1's</td>
                    <td class="text-right">$${closedTransaction.bills_1}</td>
                </tr>
                <tr>
                    <td><br> </td>
                    <td> </td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">Cash</td>
                    <td class="text-right">$${closedTransaction.total_cash}</td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">Credit Card</td>
                    <td class="text-right">$${closedTransaction.credits_amount}</td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">Check</td>
                    <td class="text-right">$${closedTransaction.checks_amount}</td>
                </tr>
                <tr>
                    <td style="width: 55%" class="text-right">Balance</td>
                    <td class="text-right">$${closedTransaction.balance}</td>
                </tr>
                </tbody>
            </table>
            
                        <button class="oculto-impresion" onclick="imprimir()">Imprimir Ticket</button>

            <div class="text-center">Close Statement ID</div>
            <canvas id="barcode"></canvas>
            
            <script>
            $(document).ready(function(){
                $("#barcode").JsBarcode("${closedTransaction.datetime}",{displayValue: true, fontSize: 20, width: 2, height: 50});
            })
            </script>
            
            <div style="text-align: center">
            <br>
            Printed By ${Globals.userInfo.username}
            <br>
            ${DateService.getDateLetter()}
            <br>


            </div>
            <script type="text/javascript">
                function imprimir() {
                    window.print();
                    window.close();
                }
            </script>
        `);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
        // mywindow.print();
    }

    static printCashOut(transaction: Transaction) {
        let mywindow = window.open('', 'PRINT', 'height=800,width=300');

        mywindow.document.write('<html><head>');
        mywindow.document.write(` 
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
 <style>
 body {
    overflow:hidden;
    -webkit-print-color-adjust: exact;
}
@media print{
  .oculto-impresion, .oculto-impresion *{
    display: none !important;
  }
  .thead-dark th {
        color: #fff !important;
        background-color: #292b2c !important;
    }
}
</style>
 <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.8.0/JsBarcode.all.js"></script>
 
 </head><body >`);
        // language=HTML
        mywindow.document.write(`

            <!--Ticker Header-->
            <div class="row">
                <div class="col-4 mt-1">
                    <img src="https://image.ibb.co/jBf2eb/Clinica_La_Familia_Logo.png" alt="">
                </div>
                <div class="col-8">
                    Clinica La Familia
                    <br>
                    301 E Cottonwood Ln
                    <br>
                    Casa Grande AZ 85122
                    <br>
                    (602) 569-3999
                </div>
            </div>

            <!--Closing Statement-->
            <table class="table table-sm">
                <thead class="">
                <tr>
                    <th style="width: 55%;">Cash Out</th>
                    <th></th>
                </tr>
                <tr>
                    <th class="text-right">Total</th>
                </t class="text-right" r>
                </thead>
                <tbody>
                <tr>
                    <td style="width: 55%" class="text-right">Cash</td>
                    <td class="text-right">$${transaction.cash}</td>
                </tr>
                
                </tbody>
            </table>
            

            <div class="text-center">Transaction ID</div>
            <canvas id="barcode"></canvas>
            
            <script>
            $(document).ready(function(){
                $("#barcode").JsBarcode("${transaction.dateRegistered}",{displayValue: true, fontSize: 20, width: 2, height: 50});
            })
            </script>
            
            <div style="text-align: center">
            <br>
            Printed By ${Globals.userInfo.username}
            <br>
            ${DateService.getDateLetter()}
            <br>

             <button class="oculto-impresion" onclick="imprimir()">Imprimir Ticket</button>

            </div>
            <script type="text/javascript">
                function imprimir() {
                    window.print();
                    window.close();
                }
            </script>
        `);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
        // mywindow.print();
    }

    static printRefund(transaction: Transaction) {
        let mywindow = window.open('', 'PRINT', 'height=800,width=300');

        mywindow.document.write('<html><head>');
        mywindow.document.write(` 
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
 <style>
 body {
    overflow:hidden;
    -webkit-print-color-adjust: exact;
}
@media print{
  .oculto-impresion, .oculto-impresion *{
    display: none !important;
  }
  .thead-dark th {
        color: #fff !important;
        background-color: #292b2c !important;
    }
}
</style>
 <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.8.0/JsBarcode.all.js"></script>
 
 </head><body >`);
        // language=HTML
        mywindow.document.write(`

            <!--Ticker Header-->
            <div class="row">
                <div class="col-4 mt-1">
                    <img src="https://image.ibb.co/jBf2eb/Clinica_La_Familia_Logo.png" alt="">
                </div>
                <div class="col-8">
                    Clinica La Familia
                    <br>
                    301 E Cottonwood Ln
                    <br>
                    Casa Grande AZ 85122
                    <br>
                    (602) 569-3999
                </div>
            </div>

            <!--Closing Statement-->
            <table class="table table-sm">
                <thead class="">
                <tr>
                    <th style="width: 55%;">Refund</th>
                    <th></th>
                </tr>
                <tr>
                    <th class="text-right">Total</th>
                </t class="text-right" r>
                </thead>
                <tbody>
                <tr>
                    <td style="width: 55%" class="text-right">Refund</td>
                    <td class="text-right">$${transaction.cash}</td>
                </tr>
                
                </tbody>
            </table>
            

            <div class="text-center">Transaction ID</div>
            <canvas id="barcode"></canvas>
            
            <script>
            $(document).ready(function(){
                $("#barcode").JsBarcode("${transaction.dateRegistered}",{displayValue: true, fontSize: 20, width: 2, height: 50});
            })
            </script>
            
            <div style="text-align: center">
            <br>
            Printed By ${Globals.userInfo.username}
            <br>
            ${DateService.getDateLetter()}
            <br>

             <button class="oculto-impresion" onclick="imprimir()">Imprimir Ticket</button>

            </div>
            <script type="text/javascript">
                function imprimir() {
                    window.print();
                    window.close();
                }
            </script>
        `);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
        // mywindow.print();
    }
}
