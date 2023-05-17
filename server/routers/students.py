from fastapi import APIRouter

router = APIRouter(
    prefix="/members",
    tags=["members"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def read_members():
    return [{"id": 1, "name": "John Doe"}, {"id": 2, "name": "Jane Doe"}]


@router.get("/{member_id}")
async def read_member(member_id: int):
    return {"id": member_id, "name": "John Doe"}


@router.post("/")
async def create_member():
    return {"message": "Member created"}


@router.put("/{member_id}")
async def update_member(member_id: int):
    return {"message": "Member updated"}


@router.delete("/{member_id}")
async def delete_member(member_id: int):
    return {"message": "Member deleted"}

