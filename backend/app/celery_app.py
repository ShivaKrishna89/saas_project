from celery import Celery
from app.core.config import settings

# Create Celery app
celery_app = Celery(
    "slack_saas",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
    include=["app.tasks"]
)

# Celery configuration
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,  # 30 minutes
    task_soft_time_limit=25 * 60,  # 25 minutes
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=1000,
)

# Optional: Configure periodic tasks
celery_app.conf.beat_schedule = {
    "cleanup-old-messages": {
        "task": "app.tasks.cleanup.cleanup_old_messages",
        "schedule": 3600.0,  # Every hour
    },
    "update-user-status": {
        "task": "app.tasks.users.update_user_status",
        "schedule": 300.0,  # Every 5 minutes
    },
    "sync-elasticsearch": {
        "task": "app.tasks.search.sync_elasticsearch",
        "schedule": 1800.0,  # Every 30 minutes
    },
}
