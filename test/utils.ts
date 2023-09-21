export const untilCbCalled = <T>(setCb: (cb: (arg: T) => void, ...others: any[]) => void, ...args: any[]) =>
	new Promise<T>(resolve => {
		setCb(d => {
			resolve(d);
		}, ...args);
	});

/**
 * 根据不同vue版本号返回对应的事件集合
 * @param events 事件集合
 * @returns 对应vue版本支持的事件集合
 */
export const eventObj = (events: Record<string, any>) => {
	return {
		listeners: isVue3 ? {} : events,
		attrs: isVue3
			? Object.keys(events).reduce((obj, key) => {
					obj['on' + key[0].toUpperCase() + key.slice(1)] = events[key];
					return obj;
			  }, {} as Record<string, any>)
			: {}
	};
};
