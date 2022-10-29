const HOST = 'http://localhost:3000';

const enumStatusProduct ={
  selling:{
    name: 'Đang bán',
    nameEng: 'Selling',
    code: 1,
  },
  outOfStock:{
    name: 'Đã bán hết',
    nameEng: 'Out of stock',
    code: 2,
  },
  comingSoon:{
    name: 'Đã xóa',
    nameEng: 'Deleted',
    code: 3,
  }
}


const enumStatusOrder ={
  pending:{
    name: 'Đang chờ xử lý',
    nameEng: 'Pending',
    code: 1,
  },
  processing:{
    name: 'Đang xử lý',
    nameEng: 'Processing',
    code: 2,
  },
  shipping:{
    name: 'Đang giao hàng',
    nameEng: 'Shipping',
    code: 3,
  },
  completed:{
    name: 'Đã hoàn thành',
    nameEng: 'Completed',
    code: 4,
  },
  canceled:{
    name: 'Đã hủy',
    nameEng: 'Canceled',
    code: 4,
  }
  
}
module.exports = { HOST, enumStatusOrder,enumStatusProduct };
