// 구현해야 할 것, 전체 목록 보여주기, 검색하기, 게시물 작성, 수정, 삭제 일반 게시판처럼
import Link from "next/link";

export default function Admin(){
    return (
        <div>
            <div>
                전체 목록
            </div>
            <div>
                <input placeholder="Search"/><button>검색</button>
            </div>
            <Link href='/write'><button>작성</button></Link>
        </div>
    );
}