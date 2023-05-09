//veri çekme işlemleri bu js'de yapılır.

class Github {
  constructor() {
    this.client_id = "5446504423d47b1e54ee";
    this.client_secret = "78a7c82e0454e9ec39cd6198c3ac32dc6378b059";
    this.repos_count = 10;
    this.repos_sort = "asc";
  }
  async getUser(user) {
    // gelen userla beraber istek atma
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    //kullanıcının repolarını çekme
    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    // gelen cevabı jsona çevirme

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();
    console.log(repos);

    //işlenmiş veriyi fonksiyonun çağrıldığı yere gönderme
    return {
      profile,
      repos,
    };
  }
}

export default Github;
//hatayı yönetme

// try {
//     const profileResponse = await fetch(
//       `https://api.github.com/users/${user}`
//     );

//     // gelen cevabı jsona çevirme

//     const profile = await profileResponse.json();

//     return profile;
//   } catch (err) {
//     console.log(err);
//   }
// // }
