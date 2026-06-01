from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    GROQ_API_KEY: str
    EMBEDDING_MODEL: str

    class Config:
        env_file = ".env"


settings = Settings()