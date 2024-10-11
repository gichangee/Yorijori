from pydantic import BaseModel


# 일별 부류별 도.소매가격정보
class PriceBackAPIDto(BaseModel):
    p_regday: str

    @classmethod
    def create_dto(cls, *args):
        return cls(
            p_regday=args[0]
        )
