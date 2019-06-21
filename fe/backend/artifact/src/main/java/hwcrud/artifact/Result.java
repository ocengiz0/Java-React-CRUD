package hwcrud.artifact;

public class Result<T> {
	private boolean isSuccess;
	private String message;
	private T data;

	public Result() {

	}

	public Result(boolean isSuccess, String message, T data) {
		super();
		this.isSuccess = isSuccess;
		this.setMessage(message);
		this.data = data;
	}
	
	public boolean isSuccess() {
		return isSuccess;
	}
	
	public T getData() {
		return data;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
