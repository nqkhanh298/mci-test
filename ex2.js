/*
RULE:
    1.Vì là 1 cặp ngoặc nên nếu xếp từ trái sang phải số ngoặc mở luôn phải > số ngoặc đóng
    2.Số ngoặc mở = Số ngoặc đóng = Tham số truyền vào
    3.Luôn có 1 ngoặc đóng tương ứng khi có ngoặc mở
SOLVE:
    - Coi dãy bracket pair là 1 dãy ký tự với số phần tử là n * 2 (n là tham số truyền vào hay số brack pair)
        => Số ngoặc mở = số ngoặc đóng = n (RULE 2)
    - Lần lượt thêm vào từ trái sang phải các ngoặc mở hoặc đóng để tạo ra các trường hợp thỏa mãn
    - Nếu vẫn dư số ngoặc mở (openBracket < n) thì luôn có thể thêm ngoặc mở vào (RULE 3) cho đến khi hết
    - Có thể thêm ngoặc đóng nếu thỏa mãn RULE 1
        => Khi dùng hết số ngoặc đóng (closeBracket == n) tức đã tạo ra 1 dãy thỏa mãn
*/

// Test case
console.log(BracketCombinations(2)) // Expected output: 2
console.log(BracketCombinations(3)) // Expected output: 5
console.log(BracketCombinations(4)) // Expected ouput: 14

// Program
function BracketCombinations(num) {
    if (num > 0) {
        let arr = [] // Array to count valid case
        BracketCombinationsLogic(arr, 0, num, 0, 0)
        let numberOfCase = arr.length

        return numberOfCase
    }
    return
}

function BracketCombinationsLogic(arr, index, num, openBracket, closeBracket) {
    if (closeBracket == num) {
        // When case is valid, push 1 element to array => length of array presents number of valid case
        arr.push('1')
    } else {
        // Recursive to complete bracket string
        if (openBracket < num) {
            // Add 1 openBracket to string then continue
            BracketCombinationsLogic(arr, index + 1, num, openBracket + 1, closeBracket)
        }

        if (openBracket > closeBracket) {
            // Add 1 closeBracket to string then continue
            BracketCombinationsLogic(arr, index + 1, num, openBracket, closeBracket + 1)
        }
    }
}