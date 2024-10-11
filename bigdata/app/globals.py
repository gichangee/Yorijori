# 전역 변수와 잠금 객체
is_recipe_back_crawling_in_progress = False
is_price_back_crawling_in_progress = False
is_hdfs_upload_in_progress = False
is_mysql_upload_in_progress = False


def get_recipe_back_crawling_status():
    return is_recipe_back_crawling_in_progress


def set_recipe_back_crawling_status(status: bool):
    global is_recipe_back_crawling_in_progress
    is_recipe_back_crawling_in_progress = status


def get_price_back_crawling_status():
    return is_price_back_crawling_in_progress


def set_price_back_crawling_status(status: bool):
    global is_price_back_crawling_in_progress
    is_price_back_crawling_in_progress = status


def get_hdfs_upload_status():
    return is_hdfs_upload_in_progress


def set_hdfs_upload_status(status: bool):
    global is_hdfs_upload_in_progress
    is_hdfs_upload_in_progress = status


def get_mysql_upload_status():
    return is_mysql_upload_in_progress


def set_mysql_upload_status(status: bool):
    global is_mysql_upload_in_progress
    is_mysql_upload_in_progress = status
