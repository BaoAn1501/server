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
  processed:{
    name: 'Đã được xử lý',
    nameEng: 'Processed',
    code: 2,
  }
}
module.exports = { HOST, enumStatusOrder, enumStatusProduct };
