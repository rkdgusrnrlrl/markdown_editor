$.fn.extend({
    insertAtCaret: function(myValue) {
    	var textarea = $(this).get(0);  
    	var contents = textarea.value;
        var startPos = textarea.selectionStart;		//커서 시작
        var endPos = textarea.selectionEnd; 		//커서 끝
        textarea.value = contents.substring(0, startPos)+myValue+contents.substring(endPos, contents.length);
       	textarea.selectionStart = startPos+myValue.length;
        textarea.selectionEnd = startPos+myValue.length;
    },
    insertMultiLineTab: function() {
    	var textarea = $(this).get(0);  
    	
    	var contents = textarea.value;
        
        var startPos = textarea.selectionStart;		//커서 시작
        var endPos = textarea.selectionEnd; 		//커서 끝
		
		//선택된 라인의 첫번째 열의 첫번째 인덱스를 구함(첫번째 줄의 어느부분을 선택할지 몰라서 아래와 같은 처리 필요)
		var temp = contents.substring(startPos, endPos);
		var firstEntIdx = contents.lastIndexOf("\n", startPos);
        
        // text editor 값 세팅
        textarea.value = contents.substring(0, firstEntIdx) //처음부터 블럭 설정된 행의 첫 개행 문자 까지
				        +"\t"+contents.substring(firstEntIdx, startPos) //블럭 설정된 행의 첫 개행 문자 부터 블럭된 처음 문자까지
				        +temp.replace(/\n/g, "\n\t") // 개행 앞에 탭처리
				        +contents.substring(endPos, contents.length); // 나머지 문서부분 붙이기

		 // 커서 위치 조정 (하지 않으면 맨 뒤로 밀림)        
       	textarea.selectionStart = startPos+"\t".length;
        textarea.selectionEnd = startPos+"\t".length;
    },
    smartIndent : function () {
    	var textarea = $(this).get(0);  

    	var startPos = textarea.selectionStart;		//커서 시작
        var endPos = textarea.selectionEnd; 		//커서 끝	       
        var contents = textarea.value;

        //이전 열의 탭의 갯수 구하기
        var idx = contents.lastIndexOf("\n", startPos-1);
        var count = (contents.substring(idx, startPos).match(/\t/g) || []).length;

        // text editor 값 세팅
        textarea.value = contents.substring(0, startPos)+"\n"+"\t".repeat(count)+contents.substring(endPos, contents.length);
        
        // 커서 위치 조정 (하지 않으면 맨 뒤로 밀림)
        textarea.selectionStart = startPos+("\n"+"\t".repeat(count)).length;
        textarea.selectionEnd = endPos+("\n"+"\t".repeat(count)).length;
    }
});