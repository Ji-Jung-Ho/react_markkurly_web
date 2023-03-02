(($)=>{

  const Popup = {
    init(){
      this.buttonToggleFn();
      this.imgToggleFn();
      this.buttonNameChangeFn();
    },

    imgToggleFn(){
      $(".detail").on({
        click(e){
          e.preventDefault();
          $("img").toggleClass("on");
        }
      });
    },

    buttonToggleFn(){
      $(".detail").on({
        click(e){
          e.preventDefault();
          $(".info-tootip").toggleClass("on");
        }
      });
    },

    buttonNameChangeFn(){
      $(".detail").on({
        click(e){
          e.preventDefault();
          if($(this).text() === "자세히 보기") {
            $(this).text("간략히 보기").append()
          }
          else {
            $(this).text("자세히 보기");
          }
        }
      });
    },

  }

  Popup.init();


})(jQuery);