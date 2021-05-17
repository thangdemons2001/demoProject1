package com.vti.filter;

public class Filter {
	
	private short minMember;
	
	private short maxMember;
	
	private String serach;

	public short getMinMember() {
		return minMember;
	}

	public void setMinMember(short minMember) {
		this.minMember = minMember;
	}

	public short getMaxMember() {
		return maxMember;
	}

	public void setMaxMember(short maxMember) {
		this.maxMember = maxMember;
	}

	public String getSerach() {
		return serach;
	}

	public void setSerach(String serach) {
		this.serach = serach;
	}

	@Override
	public String toString() {
		return "Filter [minMember=" + minMember + ", maxMember=" + maxMember + ", serach=" + serach + "]";
	}
	
	
}
