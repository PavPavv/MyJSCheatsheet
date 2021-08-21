"use strict";

const asyncJS = () => {
  //////////////////////////////////////////// XHR ///////////////////////////////////////////
  const xhrTest = () => {
    let url = new URL("https://jsonplaceholder.typicode.com/comments");
    url.searchParams.set("postId", "1");

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "json";
    xhr.send();

    xhr.onload = function () {
      if (xhr.status !== 200) {
        console.log(`Dude, error: ${xhr.status}: ${xhr.statusText}`);
      } else {
        console.log(`Done! We've got ${xhr.response.length} Byte!`);
        console.log(xhr.response);
      }
    };

    xhr.onprogress = function (event) {
      if (event.lengthComputable) {
        console.log(`Downloaded ${event.loaded} from ${event.total} Byte`);
      } else {
        console.log(`${event.loaded} Byte downloaded`);
      }
    };

    xhr.onerror = function () {
      console.log("Request failed");
    };
  };
  //xhrTest();

  const xhrWatchUpload = () => {
    function upload(file) {
      let xhr = new XMLHttpRequest();

      // отслеживаем процесс отправки
      xhr.upload.onprogress = function (event) {
        console.log(`Отправлено ${event.loaded} из ${event.total}`);
      };

      // Ждём завершения: неважно, успешного или нет
      xhr.onloadend = function () {
        if (xhr.status == 200) {
          console.log("Успех");
        } else {
          console.log("Ошибка " + this.status);
        }
      };

      xhr.open("POST", "/article/xmlhttprequest/post/upload");
      xhr.send(file);
    }
  };
  //xhrWatchUpload();

  //////////////////////////////// PROMISES ///////////////////////////////////////
  const chainPromises = () => {
    let test = (a, b) => {
      return a + b;
    };

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(test(2, 3)), 1000);
    });
    promise
      .then((res) => {
        console.log("1 res", res);
        return res + 4;
      })
      .then((res) => {
        console.log("2 res", res);
        return res + 4;
      })
      .then((res) => {
        console.log("3 res", res);
        return res + 4;
      });
  };
  //chainPromises();

  const promiseFetch = () => {
    let response = fetch("https://jsonplaceholder.typicode.com/posts/1");
    response
      .then((res) => res.json())
      .then(
        (test) =>
          new Promise((resolve, reject) => {
            let div = document.createElement("div");
            div.textContent = test.title;
            document.body.append(div);
            resolve(test);
            reject(new Error("Test error!"));
          })
      )
      .catch((err) => {
        console.log("Test error: " + err);
      });
  };
  //promiseFetch();
};
asyncJS();
