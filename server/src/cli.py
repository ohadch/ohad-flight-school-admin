import logging

import typer

app = typer.Typer()


logger = logging.getLogger(__name__)


@app.command()
def create_seed_data():
    from src.config.database import Base, engine
    from src.models import Endorsement

    Base.metadata.create_all(bind=engine)

    from src.config.database import SessionLocal

    logger.info("Creating endorsements...")
    db = SessionLocal()
    db.add(Endorsement(name="Before Solo Student"))
    db.add(Endorsement(name="Solo Student"))
    db.add(Endorsement(name="Private Pilot"))
    db.add(Endorsement(name="CFI"))
    db.commit()
    db.close()


if __name__ == "__main__":
    app()
