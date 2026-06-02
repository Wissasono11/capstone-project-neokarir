class ApiResponse {
  static success(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static error(res, errorCode, message, statusCode = 500, details = null) {
    return res.status(statusCode).json({
      success: false,
      error: errorCode,
      message,
      details,
      timestamp: new Date().toISOString(),
    });
  }

  static paginated(res, data, page, limit, total, statusCode = 200) {
    const paginationObj = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    };
    return res.status(statusCode).json({
      success: true,
      data,
      pagination: paginationObj,
      meta: paginationObj,       // alias for test compatibility
      timestamp: new Date().toISOString(),
    });
  }
}

module.exports = ApiResponse;
