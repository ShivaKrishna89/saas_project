from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from elasticsearch import Elasticsearch
from app.core.database import get_db
from app.core.security import get_current_active_user
from app.core.config import settings
from app.models.user import User

router = APIRouter()

# Initialize Elasticsearch client
es = Elasticsearch([settings.ELASTICSEARCH_URL])

@router.get("/messages")
async def search_messages(
    q: str = Query(..., description="Search query"),
    channel_id: Optional[int] = Query(None, description="Filter by channel ID"),
    organization_id: Optional[int] = Query(None, description="Filter by organization ID"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user: User = Depends(get_current_active_user)
):
    """Search messages using Elasticsearch"""
    try:
        # Build search query
        search_body = {
            "query": {
                "bool": {
                    "must": [
                        {
                            "multi_match": {
                                "query": q,
                                "fields": ["content^2", "user.full_name", "channel.name"],
                                "type": "best_fields",
                                "fuzziness": "AUTO"
                            }
                        }
                    ],
                    "filter": [
                        {"term": {"is_deleted": False}}
                    ]
                }
            },
            "highlight": {
                "fields": {
                    "content": {
                        "pre_tags": ["<mark>"],
                        "post_tags": ["</mark>"]
                    }
                }
            },
            "sort": [
                {"_score": {"order": "desc"}},
                {"created_at": {"order": "desc"}}
            ],
            "from": offset,
            "size": limit
        }
        
        # Add filters if provided
        if channel_id:
            search_body["query"]["bool"]["filter"].append({"term": {"channel_id": channel_id}})
        
        if organization_id:
            search_body["query"]["bool"]["filter"].append({"term": {"organization_id": organization_id}})
        
        # Execute search
        response = es.search(
            index="messages",
            body=search_body
        )
        
        # Process results
        results = []
        for hit in response["hits"]["hits"]:
            result = hit["_source"]
            result["score"] = hit["_score"]
            if "highlight" in hit:
                result["highlight"] = hit["highlight"]
            results.append(result)
        
        return {
            "results": results,
            "total": response["hits"]["total"]["value"],
            "took": response["took"]
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Search failed: {str(e)}"
        )

@router.get("/users")
async def search_users(
    q: str = Query(..., description="Search query"),
    organization_id: Optional[int] = Query(None, description="Filter by organization ID"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user: User = Depends(get_current_active_user)
):
    """Search users using Elasticsearch"""
    try:
        # Build search query
        search_body = {
            "query": {
                "bool": {
                    "must": [
                        {
                            "multi_match": {
                                "query": q,
                                "fields": ["full_name^2", "username", "email"],
                                "type": "best_fields",
                                "fuzziness": "AUTO"
                            }
                        }
                    ],
                    "filter": [
                        {"term": {"is_active": True}}
                    ]
                }
            },
            "sort": [
                {"_score": {"order": "desc"}},
                {"full_name.keyword": {"order": "asc"}}
            ],
            "from": offset,
            "size": limit
        }
        
        # Add organization filter if provided
        if organization_id:
            search_body["query"]["bool"]["filter"].append({"term": {"organization_id": organization_id}})
        
        # Execute search
        response = es.search(
            index="users",
            body=search_body
        )
        
        # Process results
        results = []
        for hit in response["hits"]["hits"]:
            result = hit["_source"]
            result["score"] = hit["_score"]
            results.append(result)
        
        return {
            "results": results,
            "total": response["hits"]["total"]["value"],
            "took": response["took"]
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Search failed: {str(e)}"
        )

@router.get("/channels")
async def search_channels(
    q: str = Query(..., description="Search query"),
    organization_id: Optional[int] = Query(None, description="Filter by organization ID"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user: User = Depends(get_current_active_user)
):
    """Search channels using Elasticsearch"""
    try:
        # Build search query
        search_body = {
            "query": {
                "bool": {
                    "must": [
                        {
                            "multi_match": {
                                "query": q,
                                "fields": ["name^2", "description", "topic"],
                                "type": "best_fields",
                                "fuzziness": "AUTO"
                            }
                        }
                    ],
                    "filter": [
                        {"term": {"is_archived": False}}
                    ]
                }
            },
            "sort": [
                {"_score": {"order": "desc"}},
                {"name.keyword": {"order": "asc"}}
            ],
            "from": offset,
            "size": limit
        }
        
        # Add organization filter if provided
        if organization_id:
            search_body["query"]["bool"]["filter"].append({"term": {"organization_id": organization_id}})
        
        # Execute search
        response = es.search(
            index="channels",
            body=search_body
        )
        
        # Process results
        results = []
        for hit in response["hits"]["hits"]:
            result = hit["_source"]
            result["score"] = hit["_score"]
            results.append(result)
        
        return {
            "results": results,
            "total": response["hits"]["total"]["value"],
            "took": response["took"]
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Search failed: {str(e)}"
        )
